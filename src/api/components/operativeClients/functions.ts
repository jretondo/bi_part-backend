import Admin from "models/Admin"
import OperativeClient from "models/OperativeClient"


export const notifyUser = async (idClient: number, idUser: number) => {
    const client = await OperativeClient.findOne({ where: { id: idClient } })
    const user = await Admin.findOne({ where: { id: idUser } })


}