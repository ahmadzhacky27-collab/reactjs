import { useState } from "react";
import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "../../components/AppModal";
const dataCategories = [
    {
        name: "Coffee",
    },
    {
        name: "Non Coffee",
    },
    {
        name: "Product",
    },
]

const ListCategory = () => {
    const _initForm = {
        id: null,
        name: "",
        status: 'Active'
    };

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState(dataCategories);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        setFormData(_initForm);
        setIsEdit(false);
    };

    const handleEditModal = (category) => {
        setShowModal(true);
        setIsEdit(true);
        setFormData(category);
    };

    const handleDelete = (id) => {
        const isConfirm = window.confirm('Are you sure want to delete this data?')
        if (isConfirm) {
            setCategories(categories.filter((c) => c.id !== id));
        }
    };

    // const handleDelete = (id) => {
    //     const isConfirm = window.confirm('Are you sure want to delete this data?')
    //     if (!isConfirm) {
    //         return;
    //     }
    //     setUsers(users.filter((u) => u.id !== id));
    // };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            setCategories
                (categories.map((category) => (category.id === formData.id ? formData : category)));
        } else {
            const newCategory = {
                ...formData,
                id: Date.now(),
            };
            setCategories([...categories, newCategory]);
            setFormData(_initForm);
        }

        setShowModal(false);
    };

    return (
        <>
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4 className="mb-0 fw-bold">Data Category</h4>
                        </div>
                        <Button variant="primary" onClick={handleOpenModal}>
                            Create Category
                        </Button>
                    </div>
                    <Table responsive hover
                        className="align-middle mb0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>Active</td>
                                    <td>
                                        <Button onClick={() => handleEditModal(category)} variant="warning" size="sm" className="me-2">Edit</Button>
                                        <Button onClick={() => handleDelete(category.id)} variant="danger" size="sm" className="me-2">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >

            <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Category" : "Create New Category"} onSubmit={handleSubmit} submitLabel={isEdit ? 'Save Change' : "Save"}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Form.Control>
                    </Form.Group>
                </Form>
            </AppModal>

        </>
    );
};
export default ListCategory;