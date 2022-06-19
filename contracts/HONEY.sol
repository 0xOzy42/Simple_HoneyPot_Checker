// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address owner) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);
}

interface IUniswapV2Router {
    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;
}

contract HONEY {
    address owner;
    address ROUTER;
    address MAIN;
    IUniswapV2Router IROUTER;

    constructor(address _router, address _mainToken) public payable {
        owner = msg.sender;
        ROUTER = _router;
        IROUTER = IUniswapV2Router(_router);
        MAIN = _mainToken;
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAmountOutMin(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) internal view returns (uint256) {
        address[] memory path;
        if (_tokenIn == MAIN || _tokenOut == MAIN) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = MAIN;
            path[2] = _tokenOut;
        }

        uint256[] memory amountOutMins = IROUTER.getAmountsOut(_amountIn, path);
        return (amountOutMins[path.length - 1]);
    }

    function checkHoneyMain(address token)
        external
        returns (
            uint256 buyEstimate,
            uint256 buyReal,
            uint256 sellEstimate,
            uint256 sellReal,
            bool buy,
            bool sell,
            uint256 blockNumber
        )
    {
        uint256 balanceBefore = address(this).balance;
        uint256 amountIn = 10000000000000000; //0.01

        buyEstimate = getAmountOutMin(MAIN, token, amountIn);

        address[] memory path = new address[](2);
        path[0] = MAIN;
        path[1] = token;

        // BUY SWAP
        try
            IROUTER.swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: amountIn
            }(0, path, address(this), block.timestamp + 15)
        {
            buyReal = IERC20(token).balanceOf(address(this));
            buy = true;
        } catch {
            buyReal = 0;
            buy = false;
        }

        sellEstimate = getAmountOutMin(token, MAIN, buyReal);
        IERC20(token).approve(ROUTER, buyReal);
        path[0] = token;
        path[1] = MAIN;

        // SELL SWAP
        try
            IROUTER.swapExactTokensForETHSupportingFeeOnTransferTokens(
                buyReal,
                0,
                path,
                address(this),
                block.timestamp + 15
            )
        {
            sellReal = balanceBefore - address(this).balance;
            sell = true;
        } catch {
            sellReal = 0;
            sell = false;
        }
        blockNumber = block.number;
    }
}
