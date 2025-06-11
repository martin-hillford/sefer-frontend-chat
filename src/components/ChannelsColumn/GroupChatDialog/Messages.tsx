import useLanguage from 'hooks/useLanguage';
import localization from 'localization';
import SnackBar from '../../Shared/SnackBar';

const GroupSaved = ({ show, onClose } : { show: boolean, onClose: () => any }) => {
  const language = useLanguage();
  const message = localization[language].groupSaved;
  if (!show) return null;
  return <SnackBar show={show} type="success" message={message} closable onClose={onClose} />;
};

const GroupSavingFailed = ({ show, onClose } : { show: boolean, onClose: () => any }) => {
  const language = useLanguage();
  const message = localization[language].groupSaved;
  if (!show) return null;
  return <SnackBar show={show} type="error" message={message} closable onClose={onClose} />;
};

const GroupDeleted = ({ show, onClose } : { show: boolean, onClose: () => any }) => {
  const language = useLanguage();
  const message = localization[language].groupDeleted;
  if (!show) return null;
  return <SnackBar show={show} type="success" message={message} closable onClose={onClose} />;
};

const GroupDeletionFailed = ({ show, onClose } : { show: boolean, onClose: () => any }) => {
  const language = useLanguage();
  const message = localization[language].groupDeletionFailed;
  if (!show) return null;
  return <SnackBar show={show} type="error" message={message} closable onClose={onClose} />;
};

export { GroupDeleted, GroupDeletionFailed, GroupSaved, GroupSavingFailed };
