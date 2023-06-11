import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { supabase } from "../../../lib/supabase/supabaseClient";
import { Category } from "../../../types";

interface AddNewProduct {
  name: string;
  description: string;
  price: string;
  image: FileList;
  category: string;
}

interface AddProductFormProps {
  categories: Category[];
}

export default function AddProductForm({ categories }: AddProductFormProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<any>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<AddNewProduct>();

  const onSubmit: SubmitHandler<AddNewProduct> = async (data) => {
    console.log(data);

    // Step 1: Add file to supabase storage
    // uploadImg();
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImageSrc(null);
  //   }
  // };

  const uploadImg = async () => {
    const { data, error } = await supabase.storage
      .from("myshop")
      .upload(`products/${uploadImage?.name}`, uploadImage);

    if (data) {
      console.log(data);
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
          <label htmlFor="description">Opis produktu</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
          />
          {errors.name && (
            <p className="form-error">Opis produktu jest wymagana</p>
          )}
          <label htmlFor="description">Cena produktu</label>
          <input
            type="number"
            step=".01"
            id="description"
            {...register("price", { required: true })}
          />
          {errors.name && (
            <p className="form-error">Cena produktu jest wymagana</p>
          )}
          <button>Dodaj</button>
        </div>
      </div>
      <div className="w-full h-full bg-green-700">
        {imageSrc && (
          <div>
            <h3>Podgląd zdjęcia:</h3>
            <img
              src={uploadImage}
              alt="Podgląd zdjęcia"
              width={256}
              height={256}
            />
          </div>
        )}
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", { required: true })}
          // onChange={handleImageChange}
          onChange={(e: any) => setUploadImage(e.target.files[0])}
        />
        {errors.name && (
          <p className="form-error">Zdjęcie produktu jest wymagana</p>
        )}
        <button onClick={uploadImg}>Dodaj zdjęcie do supabase</button>
      </div>
    </form>
  );
}
