# backend_test (node.js)
## env npm
''' npm install cors express morgan pg winston helmet'''
## 需連線至本必pg 建立.env 內容如下 可自行更改XXX
'''DB_USER=postgres
DB_HOST=localhost
DB_NAME=XXX
DB_PASS=XXX
DB_PORT=5432
PORT=3000'''
## 測試api
### 開啟server
node server.js
### 測試每個指令會輸出log
#### 預設印出TEST
curl http://localhost:3000/api/
#### 列出所有物件
curl http://localhost:3000/api/machines
#### 新增物件會自動依service給IP
curl -X POST "http://localhost:3000/api/machines/add" -H "Content-Type: application/json"  -d '{"name": "host1", "unit" : 1, "service": "test"}'
#### 刪除物件依照name
curl -X DELETE http://localhost:3000/api/machines/host1
#### 搜尋物件依name 或 service
curl -X GET "http://localhost:3000/api/machines/search?keyword=host"