import { useState, useEffect } from "react";
const FormPeserta = ({ onSimpan, onCancel, pesertaEdit }) => {
    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");

    // useEffect memunculkan data setelah direquest, sekali, karena defaultnya tidak sekali

    useEffect(() => {
        if (pesertaEdit) {
            setNama(pesertaEdit.nama)
            setJurusan(pesertaEdit.jurusan)
        } else {
            setNama("")
            setJurusan("")
        }
    }, [pesertaEdit]);

    const handleSimpan = (e) => {
        e.preventDefault();
        // edit

        onSimpan({
            id: pesertaEdit ? pesertaEdit.id : Date.now(),
            nama,
            jurusan,
        });
        setNama("");
        setJurusan("");
    };
    return (
        <form
            onSubmit={handleSimpan}
            method="post"
            style={{
                background: "#f5f6f8",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "20px",
            }}
        >
            <h3>Tambah Peserta:</h3>
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                }}
            >
                <input
                    type="text"
                    placeholder="Nama Peserta"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    style={{ padding: "8px" }} />
                <input
                    type="text"
                    placeholder="Jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    style={{ padding: "8px" }} />
                <button type="submit"
                    style={{
                        background: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "8px 16px",
                    }}
                >
                    Simpan
                </button>
            </div>
        </form>
    );
}

export default FormPeserta;
