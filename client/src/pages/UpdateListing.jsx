import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, [params.listingId]); // Add params.listingId as a dependency

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.error('Error uploading images:', err); // Log the error for debugging
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData({
        ...formData,
        type: id,
      });
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData({
        ...formData,
        [id]: checked,
      });
    } else if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      console.error('Error updating listing:', error); // Log the error for debugging
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="profile">
      <h1 className="title">Update a Listing</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Name"
            className="input"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="textarea"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="input"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </label>
          </div>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="input"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="checkbox-item">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="input"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="checkbox-item">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="input"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular price</p>
                {formData.type === 'rent' && <span>($ / month)</span>}
              </div>
            </div>
            {formData.offer && (
              <div className="checkbox-item">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="input"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && <span>($ / month)</span>}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <p className="checkbox-label">
            Images:
            <span>(The first image will be the cover (max 6))</span>
          </p>
          <div className="checkbox-group">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="file-input"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="button bg-rose-200"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="error">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="image-preview">
                <img src={url} alt="listing image" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="btn"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="button bg-rose-200"
          >
            {loading ? 'Updating...' : 'Update listing'}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </main>
  );
}
