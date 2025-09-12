import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const confirmToast = (onConfirm) => {
  toast.info(({ closeToast }) => (
    <div style={{ padding: '10px' }}>
      <p >Are you sure you want to delete?</p>
      <div style={{ marginTop: '10px', display: 'flex',justifyContent:'space-between' }}>
        <button
          style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
          onClick={() => {
            onConfirm();  // call  delete function
            closeToast(); // close the toast
          }}
        >
          Yes
        </button>
        <button
          style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
          onClick={closeToast}
        >
          No
        </button>
      </div>
    </div>
  ), { autoClose: false });
};
