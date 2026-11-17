import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class ProductoService {

  constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) {}

  create(createProductoDto: CreateProductoDto) {
    return this.productoRepository.save(createProductoDto);
  }

  findAll() {
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return this.productoRepository.findOne({ 
      where: { 
        id:id 
      } 
    });
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productoRepository.update(id, updateProductoDto);
  }

  remove(id: number) {
    return this.productoRepository.delete(id);
  }
}
