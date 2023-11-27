import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../lib/supabase/supabaseClient";
import { addNewProduct } from "../../../services/services";
import { Category } from "../../../types";
import AddProductModal from "../modals/AddProductModal";

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
  const [fileError, setFileError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addNewProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setImageSrc(null);
      setFileError(null);
      setOpenModal((prev) => !prev);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<AddNewProduct>();

  const onSubmit: SubmitHandler<AddNewProduct> = async (data) => {
    // Step 1: Add file to supabase storage

    // Ensure that 'data.image' is an array or another indexable type
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

    await mutate(product);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const fileSizeLimit = 2 * 1024 * 1024; // 2MB

    if (file && file.size > fileSizeLimit) {
      setFileError("Przekroczono limit wielkości pliku.");
    }

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
    const { data, error } = await supabase.storage.from("myshop").upload(`products/${image?.name}`, image);

    if (data) {
      return data;
    } else if (error) {
      console.log(error);
    }
  };

  // Pobranie wybranego pliku zdjęcia
  const imageFile = watch("image");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 pt-4 pb-16 xl:flex-row lg:pt-0 lg:pb-0 lg:gap-16"
      >
        <div className="w-80 h-full sm:w-add-product">
          <div className="w-full bg-gray-800 rounded-2xl py-8 flex flex-col items-center gap-6 lg:gap-3 lg:py-14">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="form-add-product-title">
                Nazwa produktu
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="form-add-product-input"
              />
              {errors.name && <p className="form-error">Nazwa produktu jest wymagana</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="form-add-product-title">
                Rodzaj produktu
              </label>
              <select id="category" {...register("category", { required: true })} className="form-add-product-input">
                <option value="">Wybierz rodzaj</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="form-error">Rodzaj produktu jest wymagana</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="form-add-product-title">
                Opis produktu
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                className="w-64 h-32 border-2 border-gray-400 rounded-lg bg-transparent p-4 sm:w-96"
              />
              {errors.description && <p className="form-error">Opis produktu jest wymagana</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="form-add-product-title">
                Cena produktu
              </label>
              <input
                type="number"
                step=".01"
                min="0"
                id="price"
                {...register("price", { required: true })}
                className="form-add-product-input"
              />
              {errors.description && <p className="form-error">Cena produktu jest wymagana</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity" className="form-add-product-title">
                Ilość produktu
              </label>
              <input
                type="number"
                id="quantity"
                min="0"
                max="20"
                {...register("quantity", { required: true })}
                className="form-add-product-input"
              />
              {errors.quantity && <p className="form-error">Cena produktu jest wymagana</p>}
            </div>
            <button
              className={`w-64 text-white mt-12 sm:w-96 ${fileError ? "form-btn-disabled" : "form-btn"}`}
              disabled={fileError !== null}
            >
              Dodaj
            </button>
          </div>
        </div>
        <div className="h-full max-w-upload-image">
          <p className="form-add-product-title mt-8 mb-2">Zdjęcie produktu</p>
          {imageSrc && (
            <div className="relative">
              <img
                src={imageSrc}
                alt="Podgląd zdjęcia"
                width={256}
                height={256}
                className="upload-image-size object-cover"
              />
              <div
                onClick={() => {
                  setImageSrc(null);
                  reset({ image: null });
                  setFileError(null);
                }}
                className="absolute top-2 right-4 text-2xl font-bold text-trash cursor-pointer hover:animate-wiggle"
              >
                X
              </div>
            </div>
          )}
          <input
            type="file"
            id="image"
            accept="image/jpeg, image/png"
            {...register("image", { required: true })}
            onChange={handleImageChange}
            className={`${
              imageSrc ? "hidden" : "file-input file-input-bordered w-72 max-w-sm file-input-primary input-file-custom"
            }`}
          />
          {errors.image && <p className="form-error mt-2">Zdjęcie produktu jest wymagane</p>}
          {fileError ? <p className="form-error mt-2">{fileError}</p> : null}
          <p className="font-raleway font-medium mt-6">
            Dodaj zdjęcie JPEG lub PNG mniejsze niż 2MB. Zalecany rozmiar zdjęcia: 256px x 256px
          </p>
        </div>
      </form>
      {openModal && <AddProductModal isOpen={openModal} handleClose={() => setOpenModal(!openModal)} />}
    </>
  );
}
