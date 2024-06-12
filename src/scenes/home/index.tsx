import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import axiosInstance from '@/axios/axios.ts';
import OtherInformationModal from '@/scenes/home/other-informations/OtherInformationModal.tsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Banner1 from '@/assets/banner-1.png';
import Banner2 from '@/assets/banner-2.jpg';
import Banner3 from '@/assets/banner-3.jpg';
import ProductList from '@/shared/ProductList';
import { ProductFromApi } from '../admin/crud/product/Product';

type Props = {};
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import LiveChat from './live-chat/live-chat';


 
const steps = [
    {
        id: '0',
        message: 'Hey Geek!',
 
        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',
 
        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 
        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
 
            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },
 
        ],
        end: true
    }
];
 
// Creating our own theme
const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: "img.png",
    floating: true,
};

const HomePage = (props: Props) => {
  const idAccount = useAppSelector((state) => state.auth.idAccount);
  const [enableForceUserTypeOtherInfor, setEnableForceUserTypeOtherInfor] =
    useState(false);

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
    <div className="mt-10">
      <OtherInformationModal
        open={enableForceUserTypeOtherInfor}
        handleClose={closeUserTypeOtherInfo}
      />
      <Carousel
        className="mt-24"
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
      >
        <div>
          <img src={Banner1} />
        </div>
        <div>
          <img src={Banner2} />
        </div>
        <div>
          <img src={Banner3} />
        </div>
      </Carousel>
      <div className="bg-white">
        <ProductList products={products} />
      </div>
      {/* <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="GeekBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider> */}

<LiveChat />
    </div>
  );
};

export default HomePage;
