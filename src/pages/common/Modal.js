function Modal({ type, text }) {
  return (
    <div
      class="row justify-content-end"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: "0",
      }}
    >
      <div class="col-6 col-sm-4 col-lg-2">
        <div
          class={`alert alert-${type} fade show`}
          role="alert"
          style={{ textAlign: "center" }}
        >
          {/* This is my generated message */} {text}
          {/* <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <span aria-hidden="true">&times;</span>
      </button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
