const ColumnLengthToBe = 7;
const ChangeText = (id, value) => {
  // alert(id + value);z
  const element = document.getElementById(id);
  element.innerText = value;
};
const ChangeBgColor = (id, id2, value) => {
  const element = document.getElementById(id);
  const element2 = document.getElementById(id2);
  element.style.backgroundColor = value;
  element2.style.backgroundColor = value;
};
function showPreview(event, id) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById(id);
    preview.src = src;
    // preview.style.display = "block";
  }
}

const Start = () => {

  // Getting all input values
  const background_color = document.getElementById("color").value;
  const Header_Logo = document.getElementById("logo");
  if (Header_Logo.value === "") {
    alert("Please select header logo");
    return 0;
  }
  const Header_Logo_Url = URL.createObjectURL(Header_Logo.files[0]);
  const School_Name = document.getElementById("school_name_input").value;
  const header_l1_address = document.getElementById("header_l1_address").value;
  const header_l2_address = document.getElementById("header_l2_address").value;
  const session_year = document.getElementById("session_year").value;
  const Signature = document.getElementById("sign");
  if (Signature.value === "") {
    alert("Please select the signature");
    return 0;
  }
  const Signature_URL = URL.createObjectURL(Signature.files[0]);
  console.log(Signature_URL);
  const photos = document.getElementById("photos");
  if (photos.value === "") {
    alert("Please uppload Photos");
    return 0;
  }
  let PhotosArr = []; var i;
  for (i = 0; i < photos.files.length; i++) {
    let tempImgURL = URL.createObjectURL(photos.files[i]);
    PhotosArr.push(tempImgURL);
  }
  const ExcelFile = document.getElementById("excel");
  if (ExcelFile.value === "") {
    alert("Please select excel file");
    return 0;
  }
  if (ExcelFile.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    alert("Only excel file is allowed (.xlsx)");
    return 0;
  }


  // Reading excel file
  readXlsxFile(ExcelFile.files[0]).then(function (data) {
    if (ColumnLengthToBe != data[0].length) {
      alert('Invalid File System. Please check the excel format again');
    } else {
      const TotalLength = data.length;
      if ((TotalLength - 1) !== PhotosArr.length) {
        alert("Number of rows in the excel file does not match the number of images selected");
      } else {
        const TARGETbox = document.getElementById("TARGET");
        var FinalOutput = '';
        var j;
        for (j = 1; j < TotalLength; j++) {
          var value_1 = data[j][0] === null ? "" : data[j][0];
          var value_2 = data[j][1] === null ? "" : data[j][1];
          var value_3 = data[j][2] === null ? "" : data[j][2];
          var value_4 = data[j][3] === null ? "" : data[j][3];
          var value_5 = data[j][4] === null ? "" : data[j][4];
          var value_6 = data[j][5] === null ? "" : data[j][5];
          var value_7 = data[j][6] === null ? "" : data[j][6];
          FinalOutput += '<div class="card-box-main-outer result_cards"> <div class="card-1-header-bg"></div> <div class="card-1-header-flexed"> <img class="card-1-school-logo" width="40" src=' + Header_Logo_Url + ' alt="Logo" /> <div class="card-1-header-details-box"> <h5 class="fw-bold text-center card-1-school-name mt-2">' + School_Name + '</h5> <h6 class="fw-bolder card-1-sub-header-text text-center">' + header_l1_address + '</h6> <h6 class="fw-bolder card-1-sub-header-text text-center">' + header_l2_address + '</h6> </div> </div> <div class="card-1-body"> <h6 style="font-size: 11px">' + data[0][0] + ': ' + value_1 + '</h6> <h5 style="font-size: 14px">' + value_2 + '</h5> <h6 style="font-size: 11px">' + data[0][2] + ' : ' + value_3 + '</h6> </div> <div class="card-1-second-body"> <div> <h6 class="card-1-list-flexed"> <span class="card-1-s-content-label">' + data[0][3] + ' </span>: ' + value_4 + ' </h6> <h6 class="card-1-list-flexed"> <span class="card-1-s-content-label">' + data[0][4] + ' </span>: ' + value_5 + ' </h6> <h6 class="card-1-list-flexed"> <span class="card-1-s-content-label"> ' + data[0][5] + ' </span> : ' + value_6 + ' </h6> <h6 class="card-1-list-flexed"> <span class="card-1-s-content-label"> ' + data[0][6] + ' </span>: ' + value_7 + ' </h6> </div> <img class="card-1-student-image" src=' + PhotosArr[j - 1] + ' alt="Image" /> </div> <img class="card-1-p-sign-img" src=' + Signature_URL + ' alt="Sign" /> <div class="card-1-footer"> <h6 style="font-size: 12px" class="">' + session_year + '</span> </h6> <h6 style="font-size: 12px" class="">Principal Signature</h6> </div> </div>';
        }
        // Print Data in TARGET box
        TARGETbox.innerHTML = FinalOutput;
        let AllHeaderBgs = document.querySelectorAll(".card-1-header-bg");
        let AllFooterBgs = document.querySelectorAll(".card-1-footer");
        var k = 0;
        for (k = 0; k < AllHeaderBgs.length; k++) {
          AllHeaderBgs[k].style.backgroundColor = background_color;
        }
        var k = 0;
        for (k = 0; k < AllFooterBgs.length; k++) {
          AllFooterBgs[k].style.backgroundColor = background_color;
        }
      }
    }
  }, function (error) {
    console.error(error)
    alert(error.message);
  })


}