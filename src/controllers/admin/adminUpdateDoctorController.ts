import Prisma from "../../database/connection";

const updateDoctor = async (req: any, res: any) => {
    const id: number = req.body.id;
    const toChange: string = req.body.toChange;
    const data: any = req.body.data;

    if (
        typeof id === "undefined" ||
        typeof toChange === "undefined" ||
        typeof data === "undefined"
    ) {
        res.status(400).send("undefined field/s!");
    }

    await Prisma.doctors.update({
        where: {
            Id: id,
        },
        data: {
            [toChange]: data,
        },
    });

    res.send("Updated");
};

export default updateDoctor;