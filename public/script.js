function updateVoltage() {
  let indicator = $("#indicator");
  let newSize = Math.floor(Math.random() * 40) + 1;

  indicator.animate(
    {
      width: newSize + "vh",
      height: newSize + "vh",
    },
    5000
  );
}

$(function () {
  setInterval(updateVoltage, 2000);
});
