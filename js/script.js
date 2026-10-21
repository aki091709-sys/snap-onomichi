const drawerMq = window.matchMedia("(min-width: 768px)");

drawerMq.addEventListener("change", function (e) {
  if (e.matches) {
    jQuery("#js-drawer-button").removeClass("is-checked");
    jQuery("#js-drawer-content").removeClass("is-checked");

    if (!jQuery(".modal.is-open").length) {
      jQuery("body").removeClass("is-modal-open");
    }
  }
});

jQuery("#js-drawer-button").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-button").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");

  if (jQuery("#js-drawer-button").hasClass("is-checked")) {
    jQuery("body").addClass("is-modal-open");
  } else {
    jQuery("body").removeClass("is-modal-open");
  }
});

jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-button").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("body").removeClass("is-modal-open");
});

jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp(300);
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown(300);
  }
});

jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing",
  );
});

jQuery(window).on("scroll", function () {
  if (300 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});

// モーダルを開く
jQuery(".js-modal-open").on("click", function () {
  const id = jQuery(this).data("modal");
  jQuery("#" + id)
    .addClass("is-open")
    .attr("aria-hidden", "false");
  jQuery("body").addClass("is-modal-open");
});

// モーダルを閉じる
jQuery(".js-modal-close").on("click", function () {
  jQuery(this)
    .closest(".modal")
    .removeClass("is-open")
    .attr("aria-hidden", "true");
  jQuery("body").removeClass("is-modal-open");
});

// お問い合わせフォーム
const errorMessages = {
  "your-name": "お名前を入力してください。",
  "your-email": "メールアドレスを入力してください。",
  category: "お問い合わせ内容を選択してください。",
  "your-message": "メッセージを入力してください。",
  "your-privacy": "プライバシーポリシーへの同意が必要です。",
};

function validateField(el) {
  const $el = jQuery(el);
  const $error = jQuery("#" + el.id + "-error");

  if (el.checkValidity()) {
    $el.removeClass("is-invalid").removeAttr("aria-invalid");
    $error.text("");
    $el.closest(".select__wrap").removeClass("is-invalid");
    return true;
  }

  let message = errorMessages[el.id];
  if (el.validity.typeMismatch) {
    message = "メールアドレスの形式が正しくありません。";
  }

  $el.addClass("is-invalid").attr("aria-invalid", "true");
  $error.text(message);
  $el.closest(".select__wrap").addClass("is-invalid");
  return false;
}

// 送信ボタンを押したとき
jQuery(".contact__form").on("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  let $firstError = null;

  jQuery(this)
    .find("[required]")
    .each(function () {
      if (!validateField(this)) {
        isValid = false;
        if (!$firstError) {
          $firstError = jQuery(this);
        }
      }
    });

  if (!isValid) {
    $firstError.trigger("focus");
    return;
  }

  alert("送信が完了しました。お問い合わせありがとうございます。");
  this.reset();
});

jQuery(".contact__form").on("input change", "[required]", function () {
  if (jQuery(this).hasClass("is-invalid")) {
    validateField(this);
  }
});

new Swiper(".js-about-swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 5000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      spaceBetween: 20,
    },
  },
});

new Swiper(".spots__swiper", {
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  slideToClickedSlide: true,
  spaceBetween: 16,
  speed: 400,
  navigation: {
    prevEl: ".js-spots-prev",
    nextEl: ".js-spots-next",
  },
  breakpoints: {
    768: {
      spaceBetween: 32,
      centeredSlides: false,
      slideToClickedSlide: false,
    },
  },
});
