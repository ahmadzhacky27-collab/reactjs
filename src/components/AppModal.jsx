// import { Modal, Button } from "react-bootstrap";

// const AppModal = ({ show, onClose, size = "md", title, children, onSubmit, submitLabel = "Simpan", cancelLabel = "Batal", isLoading = false, showFooter = true }) => {
//     return (
//         <Modal show={show} onHide={onClose} size={size}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{title}</Modal.Title>
//             </Modal.Header>
//             <form onSubmit={onSubmit}>
//                 <Modal.Body>
//                     {children}
//                 </Modal.Body>
//                 {showFooter && (
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={onClose}>
//                             {cancelLabel}
//                         </Button>
//                         <Button type="submit" variant="primary" disabled={isLoading}>
//                             {isLoading ? 'Simpan...' : submitLabel}
//                         </Button>
//                     </Modal.Footer>
//                 )}
//             </form>
//         </Modal >
//     );
// };

// export default AppModal;

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogFooter
} from "@/components/ui/dialog"

const AppModal = ({ show, onClose, onSubmit, submitLabel = "Save", cancelLabel = "Cancel", isLoading = false, showFooter = true, children, title }) => {
    return (

        <Dialog open={show} openChange={onClose}>
            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div className="py-2">{children}</div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : submitLabel}
                        </Button>
                        <Button variant="outline" onClick={() => onClose(false)}>
                            {cancelLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    );
};


export default AppModal;