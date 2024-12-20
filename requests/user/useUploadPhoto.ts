import Api from "../../axios";

export const userUploadPhoto = async (uri: string) => {
    try {
        const formData = new FormData();

        // Precisamos pegar o nome do arquivo a partir da URI
        const fileName = uri.split("/").pop();

        // Adiciona o arquivo ao FormData
        formData.append("file", {
            uri, // A URI da imagem capturada
            name: fileName, // O nome do arquivo
            type: "image/jpeg" // Tipo MIME, ajuste para png se necessário
        } as unknown as Blob); // Força o tipo correto para evitar erro de tipo

        // Faz a requisição de upload
        return await Api.post("/user/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (error) {
        console.error("Erro ao enviar a foto:", error);
        throw error;
    }
};
