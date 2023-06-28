import { useEffect, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";

import { Category, Product } from "../../../types";
import DeleteProductModal from "../modals/DeleteProductModal";

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

export interface ProductToDelete {
  productId: string;
  priceId: string;
}

const columnHelper = createColumnHelper<TableProducts>();

const columns = [
  columnHelper.accessor((row) => row.image, {
    id: "image",
    header: "",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt=""
        width={40}
        height={40}
        className="rounded-md"
      />
    ),
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
  const [productToDelete, setProductToDelete] = useState<ProductToDelete>({
    productId: "",
    priceId: "",
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const deleteProduct = (productId: string, priceId: string) => {
    setProductToDelete({
      productId,
      priceId,
    });
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
      <div className="overflow-x-auto">
        <table className="table w-full [&_tr.hover:hover_*]:!bg-orange-500">
          <thead>
            {table.getHeaderGroups().map((headerGroups) => (
              <tr key={headerGroups.id}>
                {headerGroups.headers.map((header) => (
                  <th key={header.id} className="bg-gray-800">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover text-white">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="bg-gray-700">
                    {cell.column.id === "delete" ? (
                      <FaTrashAlt
                        onClick={() =>
                          deleteProduct(
                            cell.row.original.id,
                            cell.row.original.price_id
                          )
                        }
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
        </table>
      </div>
      {openModal && (
        <DeleteProductModal
          isOpen={openModal}
          handleClose={() => setOpenModal(!openModal)}
          isButton={true}
          productToDelete={productToDelete}
        />
      )}
    </>
  );
}
