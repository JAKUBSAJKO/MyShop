import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { supabase } from "../../../lib/supabase/supabaseClient";
import { Category } from "../../../types";
import { routes } from "../../../routes/routes";

interface AddNewProduct {
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: File | null;
  category: string;
}

interface AddProductFormProps {
  categories: Category[];
}

export default function AddProductForm({ categories }: AddProductFormProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<AddNewProduct>();

  const onSubmit: SubmitHandler<AddNewProduct> = async (data) => {
    // Step 1: Add file to supabase storage
    const file = data.image?.[0];
    const path = await uploadImg(file);
    const imagePath = `${process.env.NEXT_PUBLIC_LINK_TO_STORAGE_BUCKET}${path?.path}`;

    const product = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: imagePath,
      categoryId: data.category,
    };

    // Step 2: Add product to Stripe and get price_id
    const newProduct = await fetch(routes.addProduct, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newData = await newProduct.json();

    console.log(newData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  };

  const uploadImg = async (image: File) => {
    const { data, error } = await supabase.storage
      .from("myshop")
      .upload(`products/${image?.name}`, image);

    if (data) {
      return data;
    } else if (error) {
      console.log(error);
    }
  };

  // Pobranie wybranego pliku zdjęcia
  const imageFile = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <div className="w-96 h-full bg-green-600">
        <div>
          <label htmlFor="name">Nazwa produktu</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="form-error">Nazwa produktu jest wymagana</p>
          )}
          <label htmlFor="category">Rodzaj produktu</label>
          <select id="category" {...register("category", { required: true })}>
            <option value="">Wybierz rodzaj</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="form-error">Rodzaj produktu jest wymagana</p>
          )}
          <label htmlFor="description">Opis produktu</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="form-error">Opis produktu jest wymagana</p>
          )}
          <label htmlFor="description">Cena produktu</label>
          <input
            type="number"
            step=".01"
            id="price"
            {...register("price", { required: true })}
          />
          {errors.description && (
            <p className="form-error">Cena produktu jest wymagana</p>
          )}
          <label htmlFor="description">Ilość produktu</label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <p className="form-error">Cena produktu jest wymagana</p>
          )}
          <button>Dodaj</button>
        </div>
      </div>
      <div className="w-full h-full bg-green-700">
        {imageSrc && (
          <div>
            <h3>Podgląd zdjęcia:</h3>
            <div className="relative">
              <img
                src={imageSrc}
                alt="Podgląd zdjęcia"
                width={256}
                height={256}
              />
              <div
                onClick={() => {
                  setImageSrc(null);
                  reset(
                    { image: null },
                    {
                      keepErrors: true,
                    }
                  );
                }}
                className="absolute top-0 right-0 text-2xl font-bold"
              >
                X
              </div>
            </div>
          </div>
        )}
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", { required: true })}
          onChange={handleImageChange}
          className={`${imageSrc ? "hidden" : ""}`}
        />
        {errors.name && (
          <p className="form-error">Zdjęcie produktu jest wymagana</p>
        )}
      </div>
    </form>
  );
}
