import FileCollection, {IFile} from '../model/file.model';
class FileService {
    async list(email: string) {
        return FileCollection.find({ 
            email,
        }).then((files) =>(files))
    }

    async find(id: string) {
        return FileCollection.findById(id).then((result) => {
            if(result) {
                return result;
            }
            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        })
    }

    

    async create(input: IFile) {
        return FileCollection.create({
            email: input.email,
            path: input.path,
            type: input.type,
            size: input.size,
            name: input.name,
            signed: false,
        }).then(result =>(result));
    }

    async update(input: IFile) {
        const file = await FileCollection.findById(input.id);
        if (!file){
            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        }
        file.name = input.name ? input.name : file.name;
        file.size = input.size ? input.size : file.size;
        file.path = input.path ? input.path : file.path;
        file.signed = input.signed;
        await file.save();
        return file;
    }

    async delete(id: string) {
        return FileCollection.findByIdAndRemove(id).then((res) => (res));
    }
}

export default new FileService();