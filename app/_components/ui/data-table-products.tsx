"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/app/_components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const categories = [
  { value: "ALL", label: "Todas as categorias" },
  { value: "BAG_FEED", label: "Ração em Saca" },
  { value: "KG_FEED", label: "Ração a Granel" },
  { value: "SNACK", label: "Petiscos" },
  { value: "ACCESSORY", label: "Acessórios" },
  { value: "TOY", label: "Brinquedos" },
  { value: "MEDICINE", label: "Medicamentos" },
  { value: "HYGIENE", label: "Higiene" },
  { value: "PLAGUE_CONTROL", label: "Controle de pragas" },
];

const animals = [
  { value: "ALL", label: "Todos os animais" },
  { value: "DOG", label: "Cachorro" },
  { value: "CAT", label: "Gato" },
  { value: "DOG_AND_CAT", label: "Cachorro e Gato" },
  { value: "OTHER", label: "Outro" },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [animalFilter, setAnimalFilter] = useState("ALL");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    if (value === "ALL") {
      table.getColumn("category")?.setFilterValue("");
    } else {
      table.getColumn("category")?.setFilterValue(value);
    }
  };

  const handleAnimalChange = (value: string) => {
    setAnimalFilter(value);
    if (value === "ALL") {
      table.getColumn("animal")?.setFilterValue("");
    } else {
      table.getColumn("animal")?.setFilterValue(value);
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Filtrar produtos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={categoryFilter}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={animalFilter}
          onValueChange={handleAnimalChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o animal" />
          </SelectTrigger>
          <SelectContent>
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-primary">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
