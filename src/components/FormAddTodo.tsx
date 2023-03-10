import React, { useId } from "react";
import { CardAssign, CardTodo } from "../typeDef/CardTodo";
import { useForm } from "react-hook-form";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";
import PriorityTag from "./PriorityTag";
import { arrayUser } from "../store/dataStore";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { createTodo, editTodo } from "../store/todoSlice";

type FormInputs = Partial<Omit<CardAssign, "createdAt" | "id" | "status">>;

type Props = {
    onCancel: (param?: any) => unknown;
    onSubmit: (param?: any) => unknown;
    defaultValue?: CardAssign;
};

export default function FormAddTodo<T extends Props>({
    onCancel,
    onSubmit: onSubmitProps,
    defaultValue,
    ...props
}: T) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: defaultValue,
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        delayError: 100,
    });
    const dispatch = useDispatch();
    const idGenerate = useId();
    function onSubmit(data: FormInputs) {
        if (defaultValue) {
            let submitObj: CardAssign = {
                ...data,
                createdAt: new Date().toString(),
                status: defaultValue.status,
                estimate: defaultValue.estimate,
                id: defaultValue.id,
                userIds: data.userIds || defaultValue.userIds,
                title: data.title || defaultValue.title,
                content: data.content || defaultValue.content,
                priority: data.priority || defaultValue.priority,
            };
            dispatch(editTodo(submitObj));
        } else {
            let submitObj: CardAssign = {
                ...data,
                createdAt: new Date().toString(),
                status: "BACKLOG",
                estimate: "1day",
                id: idGenerate,
                userIds: data.userIds || 1,
                title: data.title || "",
                content: data.content || "",
                priority: data.priority || 1,
            };
            dispatch(createTodo(submitObj));
        }
        onSubmitProps();
    }
    return (
        <Form onSubmit={onSubmit} useFormSubmit={handleSubmit}>
            <Input
                name="title"
                register={register}
                label="Title"
                validateOption={{ required: "Kh??ng ???????c b??? tr???ng tr?????ng n??y" }}
                errorsMsg={errors.title?.message}
                placeHolder="Nh???p t??n th???"
            />
            <Input
                name="content"
                register={register}
                label="Content"
                validateOption={{ required: "Kh??ng ???????c b??? tr???ng tr?????ng n??y" }}
                errorsMsg={errors.content?.message}
                placeHolder="Nh???p n???i dung th???"
            />
            <Select
                name="priority"
                register={register}
                setValue={setValue}
                label="Tr???ng th??i"
                placeHolder="Ch???n ????? ??u ti??n c???a th???"
                defaultValue={defaultValue?.priority}
                options={[
                    {
                        title: (
                            <div className="flex gap-2 items-center">
                                Medium <PriorityTag level={1} />
                            </div>
                        ),
                        value: 1,
                    },
                    {
                        title: (
                            <div className="flex gap-2 items-center">
                                Warning <PriorityTag level={2} />
                            </div>
                        ),
                        value: 2,
                    },
                    {
                        title: (
                            <div className="flex gap-2 items-center">
                                Block <PriorityTag level={3} />
                            </div>
                        ),
                        value: 3,
                    },
                ]}
            ></Select>
            <Select
                name="userIds"
                register={register}
                setValue={setValue}
                mode="multiple"
                label="Ng?????i ?????m nhi???m"
                placeHolder="Th??? n??y s??? do ai ?????m nhi???m"
                defaultValue={defaultValue?.userIds}
                options={arrayUser.map((user, _index) => ({
                    title: (
                        <div className="flex gap-2">
                            {user.name} <Avatar {...user} />
                        </div>
                    ),
                    value: user.id,
                }))}
            ></Select>

            <div className="flex gap-4 justify-center mt-4">
                <button type="submit" className="btn-primary">
                    Submit
                </button>
                <button
                    type="submit"
                    onClick={() => {
                        onCancel();
                    }}
                    className="btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </Form>
    );
}
