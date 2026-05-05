import { BookingForm } from "@/components/booking-form";
import { HeroCarousel } from "@/components/hero-carousel";
import { storeInfo } from "@/lib/store-info";
import Image from "next/image";

const services = [
  {
    title: "犬只基础洗护",
    description: "清洁、吹干、耳道清洁、指甲修剪、脚底毛修整。",
    image: "/assets/store-bath-spa.png",
    alt: "狗狗洗护服务",
  },
  {
    title: "猫咪低压洗护",
    description: "独立安静时段，低噪吹干，减少应激和等待时间。",
    image: "/assets/store-reception.png",
    alt: "猫咪护理服务",
  },
  {
    title: "造型修剪",
    description: "圆头、泰迪装、清爽短毛、局部打薄和毛结处理。",
    image: "/assets/store-grooming-suite.png",
    alt: "宠物美容修剪",
  },
  {
    title: "皮毛养护",
    description: "针对换毛、干燥、异味和敏感皮肤的护理方案。",
    image: "/assets/store-bath-spa.png",
    alt: "两只狗户外奔跑",
  },
];

const prices = [
  {
    tag: "小型犬",
    title: "基础清洁",
    description: "适合日常洗澡和轻度护理。",
    price: "¥88",
    items: ["沐浴吹干", "耳道清洁", "指甲修剪"],
  },
  {
    tag: "热门",
    title: "全套洗护",
    description: "覆盖清洁、基础美容和皮毛护理。",
    price: "¥168",
    items: ["基础清洁全项", "脚底毛与腹底毛", "护毛素护理"],
    featured: true,
  },
  {
    tag: "猫咪",
    title: "低压洗护",
    description: "预约独立时段，减少陌生环境压力。",
    price: "¥198",
    items: ["猫咪专用清洁", "低噪吹干", "毛结状态检查"],
  },
];

const testimonials = [
  {
    name: "糯米家长",
    pet: "比熊犬 · 全套洗护",
    comment:
      "以前洗完总是炸毛，这次吹得很蓬松，耳朵和脚底也清理得很细。护理师还拍了洗护过程，能看到狗狗状态很放松。",
  },
  {
    name: "小橘家长",
    pet: "猫咪 · 低压洗护",
    comment:
      "家里猫胆子小，到店后安排了单独时段，吹干声音也控制得很好。回家没有躲起来，毛摸起来干净又顺。",
  },
  {
    name: "豆包家长",
    pet: "柯基 · 皮毛养护",
    comment:
      "换毛季掉毛很严重，护理师先检查皮肤再选洗护产品，洗完之后身上味道清爽，毛结也处理得很耐心。",
  },
  {
    name: "布丁家长",
    pet: "泰迪 · 造型修剪",
    comment:
      "修剪前会确认想要的长度和脸型，最后造型自然不夸张。细节处剪得整齐，眼周也没有留下碎毛。",
  },
  {
    name: "七七家长",
    pet: "幼犬 · 适应洗护",
    comment:
      "第一次洗澡原本很担心，店员让小狗慢慢适应水声和吹风，整个过程没有催。后面预约也会继续来。",
  },
  {
    name: "旺仔家长",
    pet: "金毛 · 大型犬洗护",
    comment:
      "大型犬洗护很考验耐心，洗前会说明耗时和价格，洗后还提醒耳朵观察和下次梳毛频率，服务很踏实。",
  },
];

export default function Home() {
  const testimonialLoop = [...testimonials, ...testimonials];

  return (
    <>
      <header className="topbar" aria-label="主导航">
        <a className="brand" href="#top" aria-label={`${storeInfo.name}首页`}>
          <span className="brand-mark">爪</span>
          <span>{storeInfo.shortName}</span>
        </a>
        <nav className="nav">
          <a href="#services">服务</a>
          <a href="#care">护理标准</a>
          <a href="#pricing">价格</a>
          <a href="#testimonials">评价</a>
          <a href="#booking">位置</a>
          <a className="button" href="#booking">
            预约
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label={storeInfo.name}>
          <HeroCarousel />
          <div className="hero-inner">
            <div className="eyebrow">一宠一浴巾 · 可视化洗护 · 预约制到店</div>
            <h1>{storeInfo.name}</h1>
            <p>
              给猫狗提供温和清洁、基础美容、皮毛护理和幼宠适应洗护。流程透明，用品分区，洗完干爽不刺激。
            </p>
            <div className="hero-actions">
              <a className="button" href="#booking">
                立即预约
              </a>
              <a className="button secondary" href={`tel:${storeInfo.phone}`}>
                电话咨询
              </a>
            </div>
            <div className="hero-stats" aria-label="门店数据">
              <div className="stat">
                <strong>45min</strong>
                <span>小型犬基础洗护起</span>
              </div>
              <div className="stat">
                <strong>1v1</strong>
                <span>专属护理师接待</span>
              </div>
              <div className="stat">
                <strong>98%</strong>
                <span>回访满意度</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <h2>常用洗护服务</h2>
            <p>
              按宠物体型、毛量、性格和皮肤状态安排流程，先检查再开洗，避免一套流程套所有宠物。
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="card service-card" key={service.title}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={900}
                  height={675}
                  sizes="(max-width: 640px) 100vw, (max-width: 920px) 50vw, 25vw"
                />
                <div className="content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="band" id="care">
          <div className="band-image" role="img" aria-label="宠物洗护后的干净狗狗" />
          <div>
            <div className="section-head">
              <h2>洗得干净，也要洗得安心</h2>
              <p>
                门店采用预约制控制同一时段宠物数量，护理师会在洗前记录皮肤、耳朵、趾甲和毛结状态。
              </p>
            </div>
            <ul className="check-list">
              <li>
                <b className="care-icon" aria-hidden="true">
                  <i />
                </b>
                <span>猫犬分区，毛巾、梳具和烘干箱按宠物单独消毒。</span>
              </li>
              <li>
                <b className="care-icon" aria-hidden="true">
                  <i />
                </b>
                <span>使用温和型洗护产品，敏感皮肤可选择无香低刺激方案。</span>
              </li>
              <li>
                <b className="care-icon" aria-hidden="true">
                  <i />
                </b>
                <span>洗护完成后发送状态回访，记录下次护理建议。</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="pricing" id="pricing">
          <div className="section-head">
            <h2>透明价格</h2>
            <p>
              实际价格会根据体型、毛量、毛结和配合度微调，到店检查后确认，不强制加项。
            </p>
          </div>
          <div className="price-grid">
            {prices.map((price) => (
              <article
                className={`card price-card${price.featured ? " featured" : ""}`}
                key={price.title}
              >
                <span className="tag">{price.tag}</span>
                <h3>{price.title}</h3>
                <p>{price.description}</p>
                <div className="price">
                  {price.price} <small>起</small>
                </div>
                <ul>
                  {price.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="button" href="#booking">
                  选择服务
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials" id="testimonials">
          <div className="section-head">
            <h2>客户评价</h2>
            <p>
              更多来自到店家长的真实反馈，覆盖猫咪低压洗护、犬只基础清洁、造型修剪和皮毛养护。
            </p>
          </div>
          <div className="testimonial-marquee" aria-label="客户评价轮播">
            <div className="testimonial-track">
              {testimonialLoop.map((testimonial, index) => (
                <article className="testimonial-card" key={`${testimonial.name}-${index}`}>
                  <div className="testimonial-rating" aria-label="五星评价">
                    ★★★★★
                  </div>
                  <p>“{testimonial.comment}”</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.pet}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking" id="booking">
          <div className="booking-copy">
            <div className="section-head">
              <h2>门店位置与预约到店</h2>
              <p>
                我们在{storeInfo.address}，{storeInfo.areaHint}
                。提交预约后会在营业时间内确认档期，急单建议直接电话联系。
              </p>
            </div>
            <div className="location-details">
              <div>
                <strong>{storeInfo.name}</strong>
                <p>{storeInfo.address}</p>
              </div>
              <p>{storeInfo.navigationNote}</p>
              <div className="contact-row" aria-label="门店联系信息">
                <span>☎ {storeInfo.phone}</span>
                <span>⌚ {storeInfo.hours}</span>
                <span>⌖ 导航搜索：{storeInfo.navigationKeyword}</span>
              </div>
            </div>
            <div className="map-frame">
              <Image
                src={storeInfo.mapImage}
                alt={storeInfo.mapAlt}
                width={1200}
                height={760}
                sizes="(max-width: 920px) 100vw, 440px"
                priority
              />
            </div>
          </div>
          <BookingForm />
        </section>
      </main>

      <footer>
        <span>© 2026 {storeInfo.name}</span>
        <span>一宠一消毒 · 猫犬分区 · 透明报价</span>
      </footer>
    </>
  );
}
