
import { Outlet, useNavigate } from 'react-router-dom'
import MainHeader from './common-components/Header/MainHeader'
import { useSelector } from 'react-redux';
import Footer from './common-components/footer/Footer';


const ShoppingLayout = () => {
    const { categoryList } = useSelector((store) => store.adminCategory);
    const { subCategoryList } = useSelector((store) => store.adminSubCategory);
    const { brandsList } = useSelector((store) => store.adminBrand);

    const navigate = useNavigate()

    const handleNavigateFromHomeToListing = (getCurrentItem, section) => {

        sessionStorage.removeItem('filters')
        // console.log(getCurrentItem, section)
        const currentFilter = {
            [section]: [getCurrentItem]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        navigate('/shop/listing')
    }
    return (
        <div>
            <MainHeader />
            {/* <SecondHeader /> */}
            <Outlet />
            <Footer categoryList={categoryList} subCategoryList={subCategoryList} brandList={brandsList} handleNavigateFromHomeToListing={handleNavigateFromHomeToListing} />
        </div>
    )
}

export default ShoppingLayout