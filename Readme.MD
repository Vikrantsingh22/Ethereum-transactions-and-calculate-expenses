# Ethereum-transactions-and-calculate-expenses

It is a Node.js application designed to track Ethereum transactions and calculate expenses. It provides endpoints for retrieving transaction details and expense calculations based on wallet address.

## Features

- Retrieve detailed Ethereum transaction information for a given wallet address.
- Calculate total Ethereum expenses and fetch Ether price in INR.
- Comprehensive error handling for invalid wallet addresses and cases where no data is found.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vikrantsingh22/Ethereum-transactions-and-calculate-expenses.git
   cd Ethereum-transactions-and-calculate-expenses
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with the following content (Refer .env.sample):

   ```env
   ETHERSCAN_API_KEY=your_etherscan_api_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the application:
   ```bash
   node index.js
   ```

## API Endpoints

### 1. Fetch Transactions

**Endpoint:** `/api/fetchTransaction`

**Method:** `GET`

**Description:** Retrieves all Ethereum transactions for a specified wallet address.

**Request:**

`cURL Request`

```bash
curl --location --request GET 'http://localhost:3000/api/fetchTransaction' \
--header 'Content-Type: application/json' \
--data '{
    "walletAddress": "0xce94e5621a5f7068253c42558c147480f38b5e0d"
}'
```

**Expected Response (Success):**

```json
[
  {
    "blockNumber": "14609155",
    "blockHash": "0xa48498a87afc3714f3e6edce2fd3344ddbdb85e77eaf85bed3afa60f879616e1",
    "timeStamp": "1650284543",
    "hash": "0x25f745fc71d9ddd0db561d06a023e6c654089861dc4625cdc81743afd3228982",
    "nonce": "112207",
    "transactionIndex": "220",
    "from": "0xf598b81ef8c7b52a7f2a89253436e72ec6dc871f",
    "to": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
    "value": "10003420000000000",
    "gas": "105000",
    "gasPrice": "29489937413",
    "input": "0x",
    "methodId": "0x",
    "functionName": "",
    "contractAddress": "",
    "cumulativeGasUsed": "14067378",
    "txreceipt_status": "1",
    "gasUsed": "21000",
    "confirmations": "6047558",
    "isError": "0"
  }
  // More transactions...
]
```

**Error Responses:**

- **400 Bad Request: Invalid wallet address**

  ```json
  {
    "message": "Invalid wallet address"
  }
  ```

- **200 OK: No transactions found for this wallet address**
  ```json
  {
    "message": "No transactions found for this wallet address"
  }
  ```

### 2. Fetch Expense

**Endpoint:** `/api/fetchExpense`

**Method:** `GET`

**Description:** Calculates the total Ethereum spent and retrieves the current Ether price in INR for a specified wallet address.

**Request:**

```bash
curl --location --request GET 'http://localhost:3000/api/fetchExpense' \
--header 'Content-Type: application/json' \
--data '{
    "walletAddress": "0xce94e5621a5f7068253c42558c147480f38b5e0d"
}'
```

**Expected Response (Success):**

```json
{
  "totalEtherSpent": 0.008045434001388,
  "EtherPriceValueInINR": 207288
}
```

**Error Responses:**

- **404 Not Found: Wallet address not found**

  ```json
  {
    "message": "Wallet address not found"
  }
  ```

- **404 Not Found: No transactions found for this wallet address**

  ```json
  {
    "message": "No transactions found for this wallet address"
  }
  ```

- **500 Internal Server Error: An error occurred while calculating expenses and fetching Ether price**
  ```json
  {
    "message": "An error occurred while calculating expenses and fetching Ether price",
    "error": "error_message_here"
  }
  ```

Contact me at vikrantsingh202004@gmail.com
