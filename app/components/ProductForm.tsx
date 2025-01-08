"use client"
import { client } from "@/sanity/lib/client";
import { useState, FormEvent } from "react";

interface ImageAsset {
    _id: string;
}

const AddProductForm: React.FC = () => {
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload image to Sanity
            let imageAssetId: string | null = null;

            if (image) {
                const imageResponse: ImageAsset = await client.assets.upload("image", image, {
                    filename: image.name,
                });
                imageAssetId = imageResponse._id;
            }

            // Create product document
            await client.create({
                _type: "product",
                productName,
                price: parseFloat(price),
                image: imageAssetId ? { _type: "image", asset: { _ref: imageAssetId } } : null,
            });

            setSuccess(true);
            setProductName("");
            setPrice("");
            setImage(null);
        } catch (error) {
            console.error("Failed to create product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-xl font-bold mb-4">Add a Product</h1>

            {success && <p className="text-green-500 mb-4">Product added successfully!</p>}

            <label className="block mb-2">
                Product Name
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                />
            </label>

            <label className="block mb-2">
                Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    className="w-full p-2 border rounded mt-1"
                    required
                />
            </label>

            <label className="block mb-4">
                Product Image
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="mt-1"
                />
            </label>

            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? "opacity-50" : ""}`}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Product"}
            </button>
        </form>
    );
};

export default AddProductForm;
