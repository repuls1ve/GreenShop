import {FC, useEffect} from 'react'
import {Formik, Form, FormikHelpers} from 'formik'

import {useAppSelector, useAppDispatch} from '../../../hooks/redux'
import {changePassword, resetEditState, resetPasswordState, edit} from '../../../store/slices/user-slice'

import {AccountDetailsValidationSchema} from '../../../utils/validation'
import {IUser} from '../../../models/IUser'

import TextField from '../../../components/TextField'
import Button from '../../../components/Button'

import styles from './styles.module.css'

interface FormValues {
    firstName: IUser['firstName']
    lastName: IUser['lastName']
    email: IUser['email']
    phone: IUser['phone']
    username: IUser['username']
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

const ProfileDetails: FC = () => {
    const dispatch = useAppDispatch()
    const {...user} = useAppSelector(state => state.user.user!)
    const {
        isPasswordLoading,
        isPasswordSuccess,
        isPasswordError,
        passwordError
    } = useAppSelector(state => state.user)
    const {isEditLoading, isEditSuccess} = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(resetPasswordState())
        dispatch(resetEditState())
    }, [dispatch])

    const initialValues: FormValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    const onSave = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        dispatch(resetPasswordState())
        if (values.newPassword) {
            dispatch(changePassword({
                current: values.currentPassword,
                new: values.newPassword
            }))
        }
        dispatch(edit({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: user.address
        }))
    }

    return (
        <main className={styles.container}>
            <Formik
            validationSchema={AccountDetailsValidationSchema}
            initialValues={initialValues}
            onSubmit={onSave}
            >
                {({handleChange, values, errors}) => (
                    <>
                    <Form className={styles.form}>
                        <h3 className={styles.title}>Personal information</h3>
                        <div className={styles.row}>
                            <div className={styles.input}>
                                <TextField
                                label='First Name'
                                onChange={handleChange('firstName')}
                                value={values.firstName}
                                />
                                <h3 className={styles.inputError}>{errors.firstName}</h3>
                            </div>
                            <div className={styles.input}>
                                <TextField
                                label='Last Name'
                                onChange={handleChange('lastName')}
                                value={values.lastName}
                                />
                                <h3 className={styles.inputError}>{errors.lastName}</h3>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.input}>
                                <TextField
                                label='Email address'
                                shellActive={styles.shellReadOnly}
                                value={values.email}
                                readOnly
                                />
                            </div>
                            <div className={styles.input}>
                                <TextField
                                containerClassName={styles.input}
                                label='Phone Number'
                                onChange={handleChange('phone')}
                                value={values.phone}
                                />
                                <h3 className={styles.inputError}>{errors.phone}</h3>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.input}>
                                <TextField
                                label='Username'
                                shellActive={styles.shellReadOnly}
                                value={values.username}
                                readOnly
                                />
                            </div>
                        </div>
                    <h3 className={styles.passwordTitle}>Password change</h3>
                    </Form>
                    <Form className={styles.form}>
                        <TextField
                        type='password'
                        containerClassName={styles.passwordInput}
                        className={styles.password}
                        label='Current password'
                        onChange={handleChange('currentPassword')}
                        value={values.currentPassword}
                        />
                        <h3 className={styles.inputError}>{errors.currentPassword}</h3>
                        <TextField
                        type='password'
                        containerClassName={styles.passwordInput}
                        className={styles.password}
                        label='New password'
                        onChange={handleChange('newPassword')}
                        value={values.newPassword}
                        />
                        <h3 className={styles.inputError}>{errors.newPassword}</h3>
                        <TextField
                        type='password'
                        containerClassName={styles.passwordInput}
                        className={styles.password}
                        label='Confirm new password'
                        onChange={handleChange('confirmNewPassword')}
                        value={values.confirmNewPassword}
                        />
                        <h3 className={styles.inputError}>{errors.confirmNewPassword}</h3>
                        <div className={styles.row}>
                            <Button type='submit' className={styles.save}>Save Changes</Button>
                            <h3
                            className={isPasswordSuccess || isEditSuccess ? styles.serverSuccess : styles.serverError}
                            >{
                            isPasswordLoading || isEditLoading ? 
                            <span className={styles.serverLoading}>Loading...</span>
                            :
                            isPasswordSuccess && isEditSuccess ? 
                            'Password successfully changed. Personal information updated.'
                            :
                            isEditSuccess && isPasswordError ?
                            <span>Personal information updated.<span className={styles.serverError}>{passwordError}</span></span>
                            :
                            isEditSuccess ?
                            'Personal information updated'
                            : ''
                            }</h3>
                        </div>
                    </Form>
                    </>
                )}
            </Formik>
        </main>
    )
}

export default ProfileDetails
