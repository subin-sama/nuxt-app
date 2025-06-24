import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import IndexPage from "~/pages/index.vue";
import { useBookStore } from "~/store/book";
import type { BookSchema } from "~/util/schema/book-schema";

vi.mock("#app", () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}));

vi.mock("~/components/BookCard.vue", () => ({
  default: {
    name: "BookCard",
    props: ["books"],
    emits: ["delete", "edit"],
    template: '<div data-testid="book-card">BookCard Component</div>',
  },
}));

vi.mock("~/components/BookForm.vue", () => ({
  default: {
    name: "BookForm",
    props: ["formState", "open"],
    emits: ["create", "update", "close"],
    template: '<div data-testid="book-form">BookForm Component</div>',
  },
}));

vi.mock("@nuxt/ui", () => ({
  Button: {
    name: "Button",
    props: ["icon", "size", "color", "label", "variant"],
    emits: ["click"],
    template: '<button data-testid="add-book-btn" @click="$emit(\'click\')">{{ label }}</button>',
  },
  Icon: {
    name: "Icon",
    props: ["name", "class"],
    template: '<span data-testid="icon">Icon</span>',
  },
}));

const mockBook: BookSchema = {
  id: "test-id",
  title: "Test Book",
  author: "Test Author",
  published_year: "2023",
  genre: "Fiction",
  created_at: "2023-01-01T00:00:00.000Z",
  updated_at: "2023-01-01T00:00:00.000Z",
};

describe("Index Page", () => {
  let pinia: ReturnType<typeof createPinia>;
  let bookStore: ReturnType<typeof useBookStore>;

  const defaultStubs = {
    Icon: {
      template: '<span data-testid="icon">Icon</span>'
    },
    Button: {
      template: '<button data-testid="add-book-btn" @click="$emit(\'click\')"><slot></slot></button>',
      emits: ['click']
    },
    BookCard: {
      template: '<div data-testid="book-card">BookCard</div>',
      props: ['books'],
      emits: ['delete', 'edit']
    },
    BookForm: {
      template: '<div data-testid="book-form">BookForm</div>',
      props: ['formState', 'open'],
      emits: ['create', 'update', 'close']
    },
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    bookStore = useBookStore();
    
    vi.stubGlobal('crypto', {
      randomUUID: vi.fn(() => "test-uuid"),
    });
  });

  it("renders the page with correct title and components", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    expect(wrapper.find("h1").text()).toBe("Book Management");
    expect(wrapper.find('[data-testid="add-book-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="book-card"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="book-form"]').exists()).toBe(true);
  });

  it("initializes with correct initial state", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    const vm = wrapper.vm as any;
    expect(vm.open).toBe(false);
    expect(vm.formState.title).toBe("Add Book");
    expect(vm.formState.isUpdate).toBe(false);
    expect(vm.books).toEqual(bookStore.getAllBook());
  });

  it("opens modal when add book button is clicked", async () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    await wrapper.find('[data-testid="add-book-btn"]').trigger("click");
    
    const vm = wrapper.vm as any;
    expect(vm.open).toBe(true);
  });

  it("handles book deletion correctly", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    bookStore.addBook(mockBook);
    
    const vm = wrapper.vm as any;
    const initialCount = bookStore.getAllBook().length;
    
    vm.onDelete(mockBook);
    
    expect(bookStore.getAllBook().length).toBe(initialCount - 1);
    expect(vm.books).toEqual(bookStore.getAllBook());
  });

  it("handles book editing correctly", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    const vm = wrapper.vm as any;
    
    vm.onEdit(mockBook);
    
    expect(vm.formState.isUpdate).toBe(true);
    expect(vm.formState.title).toBe("Edit Book");
    expect(vm.open).toBe(true);
  });

  it("handles book creation correctly", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    const vm = wrapper.vm as any;
    const initialCount = bookStore.getAllBook().length;
    
    const mockEvent = {
      data: {
        title: "New Book",
        author: "New Author",
        published_year: "2024",
        genre: "Science Fiction",
      },
    };
    
    vm.onCreate(mockEvent);
    
    expect(bookStore.getAllBook().length).toBe(initialCount + 1);
    expect(vm.open).toBe(false);
    expect(vm.books).toEqual(bookStore.getAllBook());
  });

  it("handles book update correctly", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    bookStore.addBook(mockBook);
    
    const vm = wrapper.vm as any;
    
    const updatedBook = {
      ...mockBook,
      title: "Updated Title",
    };
    
    const mockEvent = {
      data: updatedBook,
    };
    
    vm.onUpdate(mockEvent);
    
    const updatedBookInStore = bookStore.getBook(mockBook.id);
    expect(updatedBookInStore?.title).toBe("Updated Title");
    expect(vm.open).toBe(false);
  });

  it("closes modal correctly", () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [pinia],
        stubs: defaultStubs,
      },
    });

    const vm = wrapper.vm as any;
    
    vm.openModal();
    expect(vm.open).toBe(true);
    
    vm.closeModal();
    expect(vm.open).toBe(false);
    expect(vm.formState.isUpdate).toBe(false);
    expect(vm.formState.title).toBe("Add Book");
  });
});