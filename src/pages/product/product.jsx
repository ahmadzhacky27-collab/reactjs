import { useState } from "react";
import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "../../components/AppModal";
const dataProducts = [
    {
        category: "Coffee",
        name: "Americano",
        price: 10000
    },
    {
        category: "Non Coffee",
        name: "Matcha Latte",
        price: 15000
    },
    {
        category: "Food",
        name: "French Fries",
        price: 12000
    },
]

const ListProduct = () => {
    const _initForm = {
        id: null,
        category: "",
        name: "",
        price: "",
        status: 'Active'
    };

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState(dataProducts);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        setFormData(_initForm);
        setIsEdit(false);
    };

    const handleEditModal = (product) => {
        setShowModal(true);
        setIsEdit(true);
        setFormData(product);
    };

    const handleDelete = (id) => {
        const isConfirm = window.confirm('Are you sure want to delete this data?')
        if (isConfirm) {
            setProducts(products.filter((p) => p.id !== id));
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
            setProducts
                (products.map((product) => (product.id === formData.id ? formData : product)));
        } else {
            const newProduct = {
                ...formData,
                id: Date.now(),
            };
            setProducts([...products, newProduct]);
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
                            <h4 className="mb-0 fw-bold">Data Product</h4>
                        </div>
                        <Button variant="primary" onClick={handleOpenModal}>
                            Create New Product
                        </Button>
                    </div>

                    <Table responsive hover
                        className="align-middle mb0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.category}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>Active</td>
                                    <td>
                                        <Button onClick={() => handleEditModal(product)} variant="warning" size="sm" className="me-2">Edit</Button>
                                        <Button onClick={() => handleDelete(product.id)} variant="danger" size="sm" className="me-2">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Category</Form.Label>
                            {/* <select value={formData.category} onChange={handleChange}>
                                <option value="">Coffee</option>
                                <option value="">Non Coffee</option>
                                <option value="">Food</option>
                            </select> */}
                            <Form.Control type="text" name="category" placeholder="Enter your category name" required value={formData.category} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your product name" required value={formData.name} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" placeholder="Enter your price" required value={formData.price} onChange={handleChange}></Form.Control>
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

            <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Product" : "Create New Product"} onSubmit={handleSubmit} submitLabel={isEdit ? 'Save Change' : "Save"}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        {/* <select value={formData.category} onChange={handleChange}>
                            <option value="">Coffee</option>
                            <option value="">Non Coffee</option>
                            <option value="">Food</option>
                        </select> */}
                        <Form.Control type="text" name="category" placeholder="Enter your category name" required value={formData.category} onChange={handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter your product name" required value={formData.name} onChange={handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" placeholder="Enter your price" required value={formData.price} onChange={handleChange}></Form.Control>
                    </Form.Group>
                </Form>
            </AppModal>

        </>
    );
};

export default ListProduct;