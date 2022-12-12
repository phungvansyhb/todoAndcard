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
import { createTodo } from "../store/todoSlice";

type Props = {
    onCancel: (param?: any) => unknown;
    onSubmit: (param?: any) => unknown;
};
type FormInputs = Partial<Omit<CardAssign, "createdAt" | "id" | "status">>;

export default function FormAddTodo({ onCancel, onSubmit: onSubmitProps }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: {},
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
        const submitObj: CardAssign = {
            ...data,
            createdAt: new Date().toString(),
            status: "BACKLOG",
            estimate: "1day",
            id: idGenerate,
            userIds: data.userIds || [],
            title : data.title || '',
            content : data.content || '',
            priority : data.priority || 1
        };
        dispatch(createTodo(submitObj));
        onSubmitProps()
    }
    return (
        <Form onSubmit={onSubmit} useFormSubmit={handleSubmit}>
            <Input
                name="title"
                register={register}
                label="Title"
                validateOption={{ required: "Không được bỏ trống trường này" }}
                errorsMsg={errors.title?.message}
                placeHolder="Nhập tên thẻ"
            />
            <Input
                name="content"
                register={register}
                label="Content"
                validateOption={{ required: "Không được bỏ trống trường này" }}
                errorsMsg={errors.content?.message}
                placeHolder="Nhập nội dung thẻ"
            />
            <Select
                name="priority"
                register={register}
                setValue={setValue}
                label="Trạng thái"
                placeHolder="Chọn độ ưu tiên của thẻ"
                defaultValue={1}
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
                mode='multiple'
                label="Người đảm nhiệm"
                placeHolder="Thẻ này sẽ do ai đảm nhiệm"
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
