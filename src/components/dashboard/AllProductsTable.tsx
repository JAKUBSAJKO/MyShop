import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";

import { deleteProduct } from "../../../services/services";
import { Category, Product } from "../../../types";
import AfterDeleteProductModal from "../modals/AfterDeleteProductModal";
import BeforeDeleteProductModal from "../modals/BeforeDeleteProductModal";

interface AllProductsTableProps {
  products: Product[] | undefined;
}

interface TableProducts {
  id: string;
  image: string;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
  Category: Category;
  created_at: Date;
}

const columnHelper = createColumnHelper<TableProducts>();

const columns = [
  columnHelper.accessor((row) => row.image, {
    id: "image",
    header: "",
    cell: (info) => <img src={info.getValue()} alt="" width={40} height={40} className="rounded-md" />,
  }),
  columnHelper.accessor("name", {
    header: "Nazwa",
  }),
  columnHelper.accessor("price", {
    header: "Cena",
  }),
  columnHelper.accessor("quantity", {
    header: "Ilość",
  }),
  columnHelper.accessor("Category.name", {
    header: "Kategoria",
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: "dataDodania",
    header: "Data dodania",
    cell: (info) => format(info.getValue<Date>(), "dd.MM.yyyy"),
  }),
  columnHelper.accessor("id", { id: "delete", header: "Usuń" }),
];

export default function AllProductsTable({ products }: AllProductsTableProps) {
  const [data, setData] = useState<TableProducts[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAfterDeleteProduct, setOpenModalAfterDeleteProduct] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteProduct(productIdToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const pickProductTodelete = (productId: string) => {
    setProductIdToDelete(productId);
    setOpenModal(true);
  };

  useEffect(() => {
    const data: TableProducts[] = (products || []).map((product: Product) => {
      return {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        price_id: product.price_id,
        quantity: product.quantity,
        Category: product.Category,
        created_at: new Date(product.created_at),
      };
    });
    setData(data);
  }, [products]);

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="table w-full [&_tr.hover:hover_*]:!bg-orange-500">
          <thead>
            {table.getHeaderGroups().map((headerGroups) => (
              <tr key={headerGroups.id}>
                {headerGroups.headers.map((header) => (
                  <th key={header.id} className="bg-gray-800">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {isLoading ? (
            <p className="w-vw h-64 bg-gray-700 text-4xl text-orange-500">Loading...</p>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover text-white">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="bg-gray-700">
                      {cell.column.id === "delete" ? (
                        <FaTrashAlt
                          onClick={() => pickProductTodelete(cell.row.original.id)}
                          className="cursor-pointer hover:bg-orange-600"
                        />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full h-[calc(100vh_-_82px)] font-raleway text-xl text-white px-4 text-center uppercase flex justify-center items-center lg:hidden sm:px-12 md:px-16">
        Przepraszamy, ta opcja jest dostępna tylko na urządzeniach desktopowych. Prosimy korzystać z komputera lub
        laptopa, aby z niej skorzystać.
      </div>
      {openModal && (
        <BeforeDeleteProductModal
          isOpen={openModal}
          handleClose={() => setOpenModal(!openModal)}
          productToDelete={productIdToDelete}
          mutate={mutate}
          products={products}
          setOpenModalAfterDeleteProduct={setOpenModalAfterDeleteProduct}
        />
      )}
      {openModalAfterDeleteProduct && (
        <AfterDeleteProductModal
          isOpen={openModalAfterDeleteProduct}
          handleClose={() => setOpenModalAfterDeleteProduct(!openModalAfterDeleteProduct)}
        />
      )}
    </>
  );
}
