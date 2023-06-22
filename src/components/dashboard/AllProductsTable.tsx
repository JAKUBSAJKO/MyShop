import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";

import { Category, Product } from "../../../types";

interface AllProductsTableProps {
  products: Product[] | undefined;
}

interface TableProducts {
  image: string;
  name: string;
  price: number;
  quantity: number;
  Category: Category;
  created_at: Date;
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
];

export default function AllProductsTable({ products }: AllProductsTableProps) {
  const data: TableProducts[] = (products || []).map((product: Product) => ({
    image: product.image,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    Category: product.Category,
    created_at: new Date(product.created_at),
  }));

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
