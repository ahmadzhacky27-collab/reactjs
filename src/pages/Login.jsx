import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const _initialForm = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(_initialForm);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        // prev : params

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/Dashboard");
        }, 1000);
    };

    return (

        <Container className="w-100 d-flex align-items-center justify-content-center min-vh-100"
        >
            <div className="w-100 d-flex align-items-center justify-content-center">
                <Card className="shadow" style={{ width: "400px" }}>
                    <Card.Body className="p-4">
                        <h2 className="font-weight-bold text-center mb-4">
                            Login Form
                        </h2>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" value={formData.email} onChange={handleChange} type="email" required></Form.Control>
                            </Form.Group>
                            {/* SSO : */}
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" onChange={handleChange} type="password" value={formData.password} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" className="w-100 " onClick={handleLogin}>
                                    {isLoading ? "Loading..." : "Sign In"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div >
        </Container >
    )
}