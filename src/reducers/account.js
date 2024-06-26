import {
  SET_USER_DATA_START,
  SET_USER_DATA_SUCCESS,
  USER_LOGOUT_SUCCESS,
  PROFILE_PICTURE_LOADER_START,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_ERROR,
  REMOVE_PROFILE_PICTURE_SUCCESS,
  REMOVE_PROFILE_PICTURE_ERROR,
  GET_ADMIN_USER_START,
  GET_ADMIN_USER_SUCCESS,
  GET_USER_COMPANY
} from '../constants';

export default function account(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA_START:
      return {
        ...state,
      };
    case SET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: action.updatedProfileData,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        data: null
      };

    case PROFILE_PICTURE_LOADER_START:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case UPLOAD_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case REMOVE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case REMOVE_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case GET_ADMIN_USER_START:
      return {
        ...state,
      };
    case GET_ADMIN_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.userData,
        privileges: action.payload.adminPrivileges
      };
    
    case GET_USER_COMPANY:
      return {
        ...state,
        company: action.payload
      }

    default:
      return state;
  }
}
