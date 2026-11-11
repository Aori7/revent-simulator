
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

export default function ImageUploadNotice() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="image-upload-wrapper">
      <button
        type="button"
        className="image-upload-button"
        onClick={() => setShowNotice(true)}
        title="Image scanning — planned feature"
      >
        <ImagePlus size={19} />
        <span>Add image</span>
      </button>

      {showNotice && (
        <div className="scam-notice" role="status">
          <div className="notice-heading">
            <strong>Image Scanning — Coming Soon</strong>

            <button
              type="button"
              onClick={() => setShowNotice(false)}
              aria-label="Close notice"
            >
              <X size={18} />
            </button>
          </div>

          <p>
            We're exploring image-based scam detection so users
            can upload screenshots of suspicious messages.
            For now, please copy and paste the message text
            for AI analysis.
          </p>
        </div>
      )}
    </div>
  );
}
