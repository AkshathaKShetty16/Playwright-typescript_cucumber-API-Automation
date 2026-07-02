
const now = new Date();

    const uniqueName: string = `Akshatha_${now.getFullYear()}${
        now.getMonth() + 1
    }${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;


export const userData = {

    createUser: {
        name: "Akshatha",
        job: "SDET"
    },


     updateUser: {
        name: uniqueName,
        job: "SDET"
    }

}