import { useTranslation } from "react-i18next";
import Modal from "../commonComponents/Modal";
import { headerContainer, reviewHeading, reviewContainer } from "./Styles";
import ModalStore from "../../store/ModalStore";
import { observer } from "mobx-react";
import TextArea from "../commonComponents/TextArea";
import Button from "../commonComponents/Button";
import MealReviewTable from "./MealReviewTable";
import ReviewModel from "../../models/ReviewModel";

interface ReviewModalType {
  items: ReviewModel[];
  review: string;
  handleTextAreaContent: (value: string) => void;
  handelCloseModal: () => void;
  errorMsg: string;
}

const ReviewModal: React.FC<ReviewModalType> = (props) => {
  const { items, review, handleTextAreaContent, handelCloseModal, errorMsg } =
    props;
  const { t } = useTranslation();
  const renderHeaderSection = () => {
    return (
      <div className={headerContainer}>
        <h1 className={reviewHeading}>{t(`${"review"}`)}</h1>
      </div>
    );
  };
  const renderButtonContainer = () => {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-3">
          <Button
            filled
            color="bg-green-600"
            hoverColor="hover:bg-green-700"
            onClick={handelCloseModal}
          >
            Done
          </Button>
          <Button
            filled
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
            onClick={ModalStore.closeReviewModalModal}
          >
            Close
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={ModalStore.isReviewModalOpen}>
      <div className={reviewContainer}>
        {renderHeaderSection()}
        <MealReviewTable items={items} />
        <div className="w-[90%]  absolute bottom-4">
          <TextArea
            rows={4}
            cols={60}
            placeholder="Write Review"
            onChange={handleTextAreaContent}
            value={review}
          />
          <p className="text-sm text-red-600">{errorMsg}</p>
          {renderButtonContainer()}
        </div>
      </div>
    </Modal>
  );
};
export default observer(ReviewModal);
