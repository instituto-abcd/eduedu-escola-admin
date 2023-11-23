export const Print = () => {
    const printContents = document.getElementById('printablediv') as HTMLElement
    if (!printContents) return

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Janela não foi aberta")
        return
    }

    printWindow.addEventListener("beforeprint", () => {
        printContents.style.display = "block";
        printWindow.document.body.replaceChildren(printContents)
    })

    printWindow.addEventListener("afterprint", () => {
        printWindow.close()
        self.close()
    })

    printWindow.print();

    // document.body.innerHTML = originalContents;

    //     const printableDiv = document.getElementById('printablediv').innerHTML;
    // 
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.write('<html><head><title>Print</title></head><body>');
    //     printWindow.document.write(printableDiv);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.print();
    //     printWindow.close();
}