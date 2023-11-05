import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const saveBtn = {
    width: '5rem',
    height: '2rem',
    border: 'none',
    marginLeft: '63rem',
    marginTop: '2rem',
    fontFamily: 'poppins',
    backgroundColor: '#F3EC99',
    cursor: 'pointer',
    fontSize: '14px'
  }
const ExportExcel = ({excelData,fileName}) =>{
    const fileType = 'application/vnd.openxmlfromformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';


    const exportToExcel = async ()=>{
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets:{'data':ws}, SheetNames:['data']};
        const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'});
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data,fileName+fileExtension);

    }
    return (
<button onClick={exportToExcel} style={saveBtn}>save</button>

    );
}
export default ExportExcel;