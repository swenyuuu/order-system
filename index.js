// 數量暫存
let order = {
  coffee: 0,
  vinegar: 0,
  lime: 0
};

// 更新數量
function updateQty(item, change) {
  order[item] = Math.max(0, order[item] + change); // 不讓數字變負數
  document.getElementById(item + "Qty").textContent = order[item];
}

// 送出訂單
function sendOrder() {

// 檢查是否有選擇商品
if (order.coffee === 0 && order.lime === 0 && order.vinegar === 0) {
  alert("請至少選擇一項產品！");
  return;
}

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const formattedPhone = "\t" + phone; // 防止前導0被刪掉
  const note = document.getElementById("note").value;

  const date = new Date().toLocaleDateString('zh-TW'); // 自動產生日期（顯示格式：YYYY/MM/DD）


// 簡單表單檢查（至少要填姓名 & 電話）
if (!name || !phone) {
  alert("⚠️ 請至少填寫『姓名』和『電話』");
  return;
}

// 顯示 loading
  document.getElementById("loadingOverlay").style.display = "flex";

//  傳送資料到 Google Script
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxf53fNEpdJi8uR7Hk98GIONYU0MVFINUw445qIFdwPTEIQH0Is1u_GMUqcmGzfgSvDFg/exec",  // TODO：換成你部署的 URL
    data: {
      "date": date,
      "name": name,
      "email": email,
      "phone": formattedPhone,
      "coffee": order.coffee,
      "vinegar": order.vinegar,
      "lime": order.lime,
      "note": note
    },
    success: function (response) {
      // 隱藏 loading
      document.getElementById("loadingOverlay").style.display = "none";

      if (response == "成功") {
        alert("訂單已送出！");
        window.scrollTo(0, 0);
        resetForm();
      }
    },
    error: function () {
      alert("❌ 訂單送出失敗，請稍後再試");
    }
  });

}

// 清空表單
function resetForm() {
  order = { coffee: 0, vinegar: 0, lime: 0 };
  document.getElementById("coffeeQty").textContent = 0;
  document.getElementById("vinegarQty").textContent = 0;
  document.getElementById("limeQty").textContent = 0;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("note").value = "";
}
