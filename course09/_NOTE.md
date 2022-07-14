# useContext
1. createContext
   - `export const BalaContext= createContext(...);`
   - createContext相當於創建一個資料後台參數的儀表板並設定型別，(...)裡面除了放參數，也放用以設定參數的function。
     - 善用enum作為參數型別，增進程式的可讀、可維護、可擴充性。
2. 設定 {ContextModuleName}.Provider
   - `const [status, setStatus] = useState<{statusType}>({init_value});`
   - 以`<BalaContext.Provider value={{status,setStatus}}></BalaContext.Provider>`包住的內容，能操作傳入的status變數。
     - *欸如果有statusA, statusB，傳入value={{ **statusA, setStatusB** }} 會怎樣?*
3. useContext(`{ContextModuleName}`)
   - `const balaContext = useContext(BalaContext);`
   - 引入context參數後，就能使用當初設定的status和setStatus:
     - `balaContext.setStatus({新的值});`