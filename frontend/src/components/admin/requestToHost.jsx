import { Button, Card } from "@nextui-org/react";


function Request() {
    return(
        <div>
            <div className="font-bold text-xl pb-5">
                Yêu Cầu Cấp Quyền
            </div>
            <div>
                <Card className="flex flex-row justify-between items-center p-2">
                    <div className="text-lg font-semibold">
                        Anh has request to become a Host
                    </div>
                    <div className="flex gap-2">
                        <Button color="primary" variant="bordered">Chấp Nhận</Button>
                        <Button color="danger" variant="bordered">Từ Chối</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Request;