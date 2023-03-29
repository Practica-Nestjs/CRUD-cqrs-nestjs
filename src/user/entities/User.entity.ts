import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User', schema: 'userDb' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;
}
