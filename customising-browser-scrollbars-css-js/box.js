(function () {
  var BOX_CLASS = "box";
  var BOX_MOD_HOVER = " box--scroll-hover";
  var BOX_MOD_MOUSE_DOWN = " box--mouse-down";

  function initBoxes() {
    var hoverZone = getComputedStyle(
      document.documentElement)
        .getPropertyValue("--box-scrollbar-width-number") || 20;

    function handleMouseMove(ev) {
      if (this.clientHeight < this.scrollHeight) {
        var boxRect = this.getBoundingClientRect();
        var posFromRight = this.offsetWidth - (ev.clientX - boxRect.left);
        this.className = BOX_CLASS +
          ((posFromRight > 0 && posFromRight < hoverZone) ? BOX_MOD_HOVER : "");
      }
    }

    function handleMouseDown() {
      this.className = this.className + BOX_MOD_MOUSE_DOWN;
    }

    function handleMouseUp() {
      this.className = this.className.replace(BOX_MOD_MOUSE_DOWN, "");
    }

    function handleMouseLeave() {
      this.className = BOX_CLASS;
    }

    var boxElements = document.getElementsByClassName(BOX_CLASS);
    for (var i = 0; i < boxElements.length; i++) {
      var box = boxElements[i];
      box.addEventListener("mousemove", handleMouseMove);
      box.addEventListener("mousedown", handleMouseDown);
      box.addEventListener("mouseup", handleMouseUp);
      box.addEventListener("mouseleave", handleMouseLeave);
    }
  }

  function initComponents() {
    initBoxes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComponents);
  } else {
    initComponents();
  }
})();