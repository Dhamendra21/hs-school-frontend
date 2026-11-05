import { useEffect, useState } from 'react';
import api from '../api/client';
import { imageSrc } from '../api/upload';

/**
 * Homepage announcement popup — controlled from Admin → Popup
 */
export default function SitePopup() {
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get('/content/popup')
      .then((r) => {
        const data = r.data;
        if (!data || !data.enabled) return;
        // Show once per browser session
        const key = 'phs_popup_seen';
        if (sessionStorage.getItem(key) === '1') return;
        setPopup(data);
        setOpen(true);
      })
      .catch(() => {});
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('phs_popup_seen', '1');
  };

  if (!open || !popup) return null;

  return (
    <div className="site-popup-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="site-popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button type="button" className="site-popup-close" onClick={close} aria-label="Close">
          ×
        </button>
        {popup.image ? (
          <div className="site-popup-image">
            <img src={imageSrc(popup.image)} alt="" />
          </div>
        ) : null}
        <h2 id="popup-title">{popup.title || 'Notice'}</h2>
        <p>{popup.message}</p>
        <button type="button" className="btn btn-primary" onClick={close}>
          {popup.buttonText || 'OK'}
        </button>
      </div>
    </div>
  );
}
