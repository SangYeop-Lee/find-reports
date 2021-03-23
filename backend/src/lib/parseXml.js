// example data
// <?xml version="1.0" encoding="UTF-8"?>
// <result>
//     <list>
//         <corp_code>00434003</corp_code>
//         <corp_name>다코</corp_name>
//         <stock_code> </stock_code>
//         <modify_date>20170630</modify_date>
//     </list>
//     <list>
//         <corp_code>00434456</corp_code>
//  (...)

// TODO
// 1. read dtaa chunk, get data from <list> to </list>
// 2. parse it to json
// 3. save data.