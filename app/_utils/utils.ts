import { OrderStatus, Product, ProductCategory } from "@prisma/client"

export const categoryLabels: Record<ProductCategory, string> = {
    BAG_FEED: "Ração em Saca",
    KG_FEED: "Ração a Granel",
    SNACK: "Pestisco",
    ACCESSORY: "Acessório",
    TOY: "Brinquedo",
    MEDICINE: "Medicamento",
    HYGIENE: "Higiene",
}

export const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmado",
    CANCELLED: "Cancelado",
    CONCLUDED: "Concluido",
}

export const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
        case "CONFIRMED":
            return "success"
        case "PENDING":
            return "warning"
        case "CANCELLED":
            return "destructive"
        case "CONCLUDED":
            return "neutral"
        default:
            return "secondary"
    }
}

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
})

export const filterProductsByCategory = (products: Product[], categories: ProductCategory[]) => {
    return products.filter(product => categories.includes(product.category));
}

export const AVAILABLE_IMAGES = [
    ["capitao-dog.png", "Capitão Dog"],
    ["chanin-premium.png", "Chanin Premium"],
    ["dog-chow.png", "Dog Chow"],
    ["friskies.png", "Friskies"],
    ["golden-formula.png", "Golden Formula"],
    ["golden-gatos.png", "Golden Gatos"],
    ["granplus.png", "Granplus"],
    ["nutrigula.png", "Nutrigula"],
    ["pedigree.png", "Pedigree"],
    ["premier-formula.png", "Premier Formula"],
    ["provence.png", "Provence"],
    ["whiskas.png", "Whiskas"]
] as const;

export const priceRanges = [
    { id: "all", label: "Todos os preços", min: 0, max: Infinity },
    { id: "0-25", label: "R$ 0,00 - R$ 25,00", min: 0, max: 25 },
    { id: "25-50", label: "R$ 25,00 - R$ 50,00", min: 25, max: 50 },
    { id: "50-100", label: "R$ 50,00 - R$ 100,00", min: 50, max: 100 },
    { id: "100-200", label: "R$ 100,00 - R$ 200,00", min: 100, max: 200 },
    { id: "200+", label: "R$ 200,00+", min: 200, max: Infinity },
];

export const formatters = {
    category: (category: ProductCategory) => categoryLabels[category],
    currency: (value: number) => currencyFormatter.format(value),
    date: (date: Date) => dateFormatter.format(date),
    status: (status: OrderStatus) => statusLabels[status],
    statusBadgeVariant: (status: OrderStatus) => getStatusBadgeVariant(status),
    filterProductsByCategory: (products: Product[], categories: ProductCategory[]) => filterProductsByCategory(products, categories),
    getAvailableImages: () => AVAILABLE_IMAGES,
    priceRange: (value: number) => priceRanges.find(range => range.min <= value && range.max >= value)?.label ?? "Todos os preços"
}