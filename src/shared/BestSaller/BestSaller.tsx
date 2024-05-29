import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import axiosInstance from '@/axios/axios.ts';
import OtherInformationModal from '@/scenes/home/other-informations/OtherInformationModal.tsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ProductList from '@/shared/ProductList';
import { ProductFromApi } from '../../scenes/admin/crud/product';

type Props = {};

const BestSallerPage= (props: Props) => {
  const idAccount = useAppSelector((state) => state.auth.idAccount);
  const [enableForceUserTypeOtherInfor, setEnableForceUserTypeOtherInfor] =
    useState(false) ;

  const [products, setProducts] = useState<ProductFromApi[]>([]);

  async function getAllProducts() {
    try {
      const response = await axiosInstance.get('/products');
      const productArr = response.data as ProductFromApi[];
      console.log('productArr: ', productArr);

      setProducts(productArr);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  useEffect(() => {
    void getAllProducts();
  }, []);

  function closeUserTypeOtherInfo() {
    setEnableForceUserTypeOtherInfor(false);
  }

  async function checkRegisterRecently(idAccount: number | null) {
    try {
      const response = await axiosInstance.get(
        '/auth/checkUserRegisterRecently',
        {
          params: {
            idAccount: idAccount,
          },
        },
      );
      const isRegisterRecently = (await response.data) as boolean;
      if (isRegisterRecently) {
        console.log('isRegister recently', isRegisterRecently);
        setEnableForceUserTypeOtherInfor(true);
      } else {
        console.log('isRegister recently', isRegisterRecently);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }
  useEffect(() => {
    if (idAccount != null) {
      void checkRegisterRecently(idAccount);
    }
  }, [idAccount]);
  return (
    <div className="mt-40">
      <OtherInformationModal
        open={enableForceUserTypeOtherInfor}
        handleClose={closeUserTypeOtherInfo}
      />
      <div className="bg-white">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default BestSallerPage;