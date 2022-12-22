import BackIcon from "components/Icons/BackIcon";
import EditIcon from "components/Icons/EditIcon";
import CloseIcon from "components/Icons/CloseIcon";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery , useMutation , useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import animalService from "services/animal.service";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/Input";
import { toast } from "react-hot-toast";

const variants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 1, y: -50 },
};

type FormEditInputs = {
    name: string;
    description: string;
};

export default function CardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEdit, toggleEdit] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<FormEditInputs>({
        mode: "all",
        reValidateMode: "onChange",
    });

    const { data, isLoading } = useQuery(
        ["getDetail",id],
        () => animalService.apiDetail( {id : id as string} ),
        { enabled: !!id }
    );
    const queryClient = useQueryClient()
    const editCharacter = useMutation(['editUser' , id] , (body:FormEditInputs)=>animalService.apiPut({id : id , body}) , {
        onMutate:(body)=>{
            const updatingCharacter = queryClient.getQueryData(["getDetail",id])
            return updatingCharacter
        },
        onSuccess : (data , body , context)=>{
            console.log("onSuccess" , data , body , context);
            queryClient.setQueryData(["getDetail",id],data);
            toggleEdit(false)
        },
        onError : (error , body , context)=>{
            console.log("onError" , data , body , context);
            // setError()
        },
        onSettled : (data , error ,body , context)=>{
            console.log("onSettled" , data , error ,body , context);
        }
    })
    
    const onSubmit: SubmitHandler<FormEditInputs> = (formData) => {
        if(formData.name === data?.name && formData.description === data?.description){
            toast.error("Bạn chưa thay đổi gì thì phải :)")
        }else{
            editCharacter.mutate(formData)
        }
    }
    return (
        <motion.div
            key="cardDetail"
            initial={{ x: "75%" }}
            animate={{ x: 0 }}
            exit={{ y: "75%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="border shadow-xl min-h-screen p-4 m-8 rounded-lg"
        >
            <div className="flex justify-between">
                <button className="btn cursor-pointer" onClick={() => navigate(-1)}>
                    <BackIcon />
                </button>
                <button className="btn cursor-pointer" onClick={() => toggleEdit(!isEdit)}>
                    {isEdit ? <CloseIcon /> : <EditIcon />}
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-4 justify-center items-center">
                {isLoading ? (
                    "loading..."
                ) : (
                    <>
                        <img
                            src={data?.avatar}
                            alt={data?.name}
                            key={id}
                            className="rounded-full border shadow"
                            width={200}
                            height={200}
                        />
                        {isEdit ? (
                            <motion.form
                                onSubmit={handleSubmit(onSubmit)}
                                key="formEditCard"
                                variants={variants}
                                initial="initial"
                                exit="exit"
                                animate="animate"
                                transition={{ type: "spring" }}
                                className="w-80"
                            >
                                <Input
                                    name="name"
                                    register={register}
                                    defaultValue={data?.name}
                                    errorsMsg={errors.name?.message}
                                    label="Tên nhân vật"
                                    placeHolder="Nhập tên nhân vật"
                                    validateOption={{ required: "Name is required" }}
                                />
                                <label htmlFor="description" className="required">
                                    Mô tả nhân vật{" "}
                                </label>
                                <textarea
                                    id="description"
                                    defaultValue={data?.description}
                                    {...register("description", {
                                        required: "Descrioption is required",
                                    })}
                                ></textarea>
                                {errors.description?.message && (
                                    <motion.div
                                        key={`input-description`}
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 10 }}
                                        transition={{ type: "spring" }}
                                        className="text-red-400 pb-2 ml-2 text-sm"
                                    >
                                        {errors.description?.message}
                                    </motion.div>
                                )}
                                <div className="flex justify-center gap-2 mt-2">
                                    <button className="btn bg-pink-700" type="submit">Save</button>
                                    <button className="btn bg-slate-600" type="reset" onClick={()=>toggleEdit(false)}>Cancel</button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="cardInfo"
                                className="flex flex-col gap-4 items-center"
                                variants={variants}
                                initial="initial"
                                exit="exit"
                                animate="animate"
                                transition={{ type: "spring" }}
                            >
                                <p className="font-bold text-4xl">{data?.name}</p>
                                <p className="font-lg w-80 text-slate-600 text-center">
                                    {data?.description}
                                </p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
