onmessage = (event) => {
    try {
        const jsonText = event.data;

        // Validaciones iniciales (más robustas):
        if (typeof jsonText !== 'string' || !jsonText.trim()) {
            postMessage("Entrada inválida. Por favor, ingresa un texto JSON válido.");
            return;
        }

        let filteredRemarks = [];
        // Regex MUCHO MÁS ROBUSTA Y EFICIENTE (maneja casos complejos):
        const regex = /\{[^}]*"bw"\s*:\s*0\.0\s*,\s*"streamStatus"\s*:\s*1\s*,\s*"dcName"\s*:\s*"B01"\s*,\s*"remark"\s*:\s*"([^"]*)"[^}]*\}/g;

        let match;
        while ((match = regex.exec(jsonText)) !== null) {
            filteredRemarks.push(match[1]);
        }

        if (filteredRemarks.length > 0) {
            postMessage(filteredRemarks.join('\n'));
        } else {
            postMessage("No se encontraron elementos que cumplan con los criterios.");
        }

    } catch (error) {
        postMessage("Error al procesar el JSON: " + error.message);
        console.error("Error en el worker:", error);
    }
};