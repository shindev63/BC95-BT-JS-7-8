class ArrayApp {
  constructor() {
    this.arr = [];
  }

  init() {
    document.getElementById("btnAdd").onclick = () =>
      this.add();
    this.renderTasks();
  }

  add() {
    const input = document.getElementById("input");
    const val = Number(input.value);
    if (isNaN(val)) return;

    this.arr.push(val);
    input.value = "";
    this.render();
  }

  render() {
    document.getElementById("array").innerText =
      "👉 " + this.arr.join(", ");
  }

  toggle(id, iconId) {
    const el = document.getElementById(id);
    const icon = document.getElementById(iconId);

    const isClosed = el.classList.contains("max-h-0");

    if (isClosed) {
      el.classList.remove("max-h-0", "p-0");
      el.classList.add("max-h-96", "p-4");

      icon.classList.add("rotate-180"); // ▼ -> ▲
    } else {
      el.classList.add("max-h-0", "p-0");
      el.classList.remove("max-h-96", "p-4");

      icon.classList.remove("rotate-180"); // ▲ -> ▼
    }
  }

  // ===== LOGIC =====
  // Bài 1: Tổng số dương
  sumPositive = () =>
    this.arr
      .filter((n) => n > 0)
      .reduce((a, b) => a + b, 0);
  // bài 2: Đếm số dương
  countPositive = () =>
    this.arr.filter((n) => n > 0).length;
  // bài 3: Tìm số nhỏ nhất
  min = () => Math.min(...this.arr);
  // bài 4: Tìm số dương nhỏ nhất
  minPositive = () =>
    Math.min(...this.arr.filter((n) => n > 0));
  // bài 5: Tìm số chẵn cuối
  lastEven = () =>
    [...this.arr].reverse().find((n) => n % 2 === 0);
  // bài 6: Đổi chỗ
  swap(i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= this.arr.length ||
      j >= this.arr.length
    )
      return null;

    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    return this.arr;
  }
  // bài 7: Sắp xếp tăng
  sortAsc = () => [...this.arr].sort((a, b) => a - b);
  // bài 8: Số nguyên tố đầu
  isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  firstPrime = () => this.arr.find((n) => this.isPrime(n));
  // bài 9: Đếm số nguyên
  countInteger = () =>
    this.arr.filter(Number.isInteger).length;
  // bài 10: So sánh số âm và dương
  compare = () => {
    const pos = this.arr.filter((n) => n > 0).length;
    const neg = this.arr.filter((n) => n < 0).length;

    if (pos > neg) return "Số dương nhiều hơn";
    if (pos < neg) return "Số âm nhiều hơn";
    return "Bằng nhau";
  };

  // ===== UI =====
  renderTasks() {
    const tasks = [
      {
        name: "Tổng số dương",
        fn: () => this.sumPositive(),
      },
      {
        name: "Đếm số dương",
        fn: () => this.countPositive(),
      },
      { name: "Tìm số nhỏ nhất", fn: () => this.min() },
      {
        name: "Tìm số dương nhỏ nhất",
        fn: () => this.minPositive(),
      },
      {
        name: "Tìm số chẵn cuối cùng",
        fn: () => this.lastEven(),
      },
      { name: "Đổi chỗ", custom: true },
      {
        name: "Sắp xếp tăng dần",
        fn: () => this.sortAsc().join(", "),
      },
      {
        name: "Tìm số nguyên tố đầu tiên",
        fn: () => this.firstPrime(),
      },
      {
        name: "Đếm số nguyên",
        fn: () => this.countInteger(),
      },
      {
        name: "So sánh số lượng âm và dương",
        fn: () => this.compare(),
      },
    ];

    const container = document.getElementById("tasks");

    container.innerHTML = tasks
      .map((t, i) => {
        const id = `c${i}`;

        return `
    <div class="rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden">

    <button onclick="app.toggle('${id}', 'icon${i}')"
    class="w-full flex justify-between items-center p-4 font-medium bg-gray-50 hover:bg-gray-100 transition">
  
      <span>🔢 ${i + 1}. ${t.name}</span>

      <span id="icon${i}" class="transition-transform duration-300">▼</span>
    </button>

      <div id="${id}" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out p-0">

        ${
          t.custom
            ? `
            <input id="i1" placeholder="Vị trí 1"
              class="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400" />

            <input id="i2" placeholder="Vị trí 2"
              class="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400" />

            <button onclick="app.runSwap(${i})"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
              Run
            </button>
          `
            : `
            <button onclick="app.run(${i})"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
              Run
            </button>
          `
        }

        <div id="r${i}" class="text-green-600 font-medium"></div>

      </div>
    </div>
    `;
      })
      .join("");

    this.tasks = tasks;
  }

  run(i) {
    const result = this.tasks[i].fn();
    document.getElementById(`r${i}`).innerText = result;
  }

  runSwap(i) {
    const a = Number(document.getElementById("i1").value);
    const b = Number(document.getElementById("i2").value);

    // clone mảng (QUAN TRỌNG)
    const newArr = [...this.arr];

    if (
      a < 0 ||
      b < 0 ||
      a >= newArr.length ||
      b >= newArr.length
    ) {
      document.getElementById(`r${i}`).innerText =
        "Sai vị trí";
      return;
    }

    // swap trên mảng clone
    [newArr[a], newArr[b]] = [newArr[b], newArr[a]];

    // KHÔNG gọi this.render()

    document.getElementById(`r${i}`).innerText =
      "Mảng sau đổi: " + newArr.join(", ");
  }
}

// 🔥 QUAN TRỌNG: đợi DOM load
window.onload = () => {
  window.app = new ArrayApp();
  app.init();
};
